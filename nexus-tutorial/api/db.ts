export interface Post {
  id: number
  title: string
  body: string
  published: boolean
}

export interface Db {
  posts: Post[]
}

export const db: Db = {
  posts: [
    {
      id: 1,
      title: 'Nexus 1st',
      body: 'Hello, World!',
      published: false
    },
    {
      id: 2,
      title: 'Nexus 2nd',
      body: 'from GraphQL and Apollo-Server.',
      published: false
    },
  ]
}