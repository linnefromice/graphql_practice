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
    t.list.field('drafts', {
      type: 'Post',
      resolve(_root, _args, ctx) {
        return ctx.db.posts.filter(p => p.published === false)
      } 
    })
  }
})