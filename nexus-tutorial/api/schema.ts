import { makeSchema } from 'nexus'
import { join } from 'path'

export const schema = makeSchema({
    types: [],
    outputs: {
        typegen: join(__dirname, '..', 'nexus-typegem.ts'),
        schema: join(__dirname, '..', 'schema.graphql')
    }
})