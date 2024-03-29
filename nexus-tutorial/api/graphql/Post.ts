import { extendType, nonNull, objectType, stringArg, intArg } from "nexus"

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id'),
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
      type: nonNull('Post'),
      resolve(_root, _args, ctx) {
        return ctx.db.post.findMany({ where: { published: false } })
      } 
    }),
    t.nonNull.list.field('posts', {
      type: nonNull('Post'),
      resolve(_root, _args, ctx) {
        return ctx.db.post.findMany({ where: { published: true } })
      }
    })
  }
})

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        const draft = {
          title: args.title,
          body: args.body,
          published: false,
        }
        return ctx.db.post.create({ data: draft })
      }
    }),
    t.field('publish', {
      type: 'Post',
      args: {
        draftId: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.post.update({
          where: { id: args.draftId },
          data: {
            published: true,
          },
        });
      }
    })
  }
})
