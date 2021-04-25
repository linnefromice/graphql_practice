import { extendType, objectType } from "nexus"

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id'),
    t.string('title'),
    t.string('body'),
    t.boolean('published')
  }
})

/*
  t.field('drafts', {
    type: nonNull(list('Post')),
  })
*/

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('drafts', {
      type: 'Post',
      resolve() {
        return [
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
    })
  }
})