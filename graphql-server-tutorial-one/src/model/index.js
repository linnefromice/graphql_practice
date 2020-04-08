
let users = {
  1: {
      id: '1',
      username: 'Robin Wieruch',
      messageIds: [1],
  },
  2: {
      id: '2',
      username: 'Dave David',
      messageIds: [2],
  },
  3: {
      id: '3',
      username: 'Mike Ross',
      messageIds: [],
  },
  4: {
      id: '4',
      username: 'Harvey Specter',
      messageIds: [],
  },
  5: {
      id: '5',
      username: 'Rachel Zane',
      messageIds: [],
  }
};
let messages = {
  1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
  },
  2: {
      id: '2',
      text: 'By World',
      userId: '2',
  },
}

module.exports = {
  users,
  messages,
};