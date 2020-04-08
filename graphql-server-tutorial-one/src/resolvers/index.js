const uuidv4 = require('uuid/v4');

module.exports = {
  Query: {
      me: (parent, args, { me }) => {
          return me;
      },
      mike: (parent, args, { mike }) => {
          return mike;
      },
      user: (parent, { id }, { model }) => {
          return model.users[id];
      },
      users: (parent, args, { model }) => {
          return Object.values(model.users);
      },
      messages: (parent, args, { model }) => {
          return Object.values(model.messages);
      },
      message: (parent, { id }, { model }) => {
          return model.messages[id];
      }
  },
  Mutation: {
      createMessage: (parent, { text }, { me, model }) => {
          const id = uuidv4();
          const message = {
              id,
              text,
              userId: me.id,
          };

          model.messages[id] = message;
          model.users[me.id].messageIds.push(id);

          return message;
      },
      deleteMessage: (parent, { id }, { model }) => {
          const { [id]: message, ...otherMessages } = model.messages;
          if (!message) {
              return false;
          }
          messages = otherMessages;
          return true
      },
  },
  User: {
      messages: (user, args, { model }) => {
          return Object.values(model.messages).filter(
              message => message.userId === user.id,
          );
      }
  },
  Message: {
      user: (message, args, { model }) => {
          return model.users[message.userId];
      }
  }
};