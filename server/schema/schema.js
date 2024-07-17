const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const User = require("../models/User");
const Game = require("../models/Game");

// Define UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  }),
});

// Define GameType
const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLID },
    players: { type: new GraphQLList(UserType) },
    board: { type: new GraphQLList(GraphQLString) },
    turn: { type: UserType },
    status: { type: GraphQLString },
  }),
});

// Define RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Game.findById(args.id);
      },
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return Game.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
  },
});

// Define Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(args.password, salt);
        const user = new User({
          username: args.username,
          password: hashedPassword,
        });
        return user.save();
      },
    },
    login: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ username: args.username });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
      },
    },
    createGame: {
      type: GameType,
      args: {
        playerId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const game = new Game({
          players: [args.playerId],
          turn: args.playerId,
        });
        return game.save();
      },
    },
    joinGame: {
      type: GameType,
      args: {
        gameId: { type: GraphQLID },
        playerId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const game = await Game.findById(args.gameId);
        if (game.players.length < 2) {
          game.players.push(args.playerId);
          game.status = "ongoing";
          return game.save();
        } else {
          throw new Error("Game room is full");
        }
      },
    },
    makeMove: {
      type: GameType,
      args: {
        gameId: { type: GraphQLID },
        playerId: { type: GraphQLID },
        moveIndex: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const game = await Game.findById(args.gameId);
        if (game.turn.toString() !== args.playerId) {
          throw new Error("Not your turn");
        }
        if (game.board[args.moveIndex] !== "") {
          throw new Error("Invalid move");
        }
        game.board[args.moveIndex] =
          game.turn.toString() === game.players[0].toString() ? "X" : "O";
        game.turn =
          game.players[0].toString() === game.turn.toString()
            ? game.players[1]
            : game.players[0];
        // Check for win/loss/draw logic here
        return game.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
