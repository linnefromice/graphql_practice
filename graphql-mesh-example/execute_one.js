const { getMesh, findAndParseConfig } = require('@graphql-mesh/runtime');
async function main() {
  const meshConfig = await findAndParseConfig();

  const { execute } = await getMesh(meshConfig);

  const { data, errors } = await execute(`
    query getItems {
      getItems{
        title
        likesCount
      }
    }
  `);
  const items = data.getItems;
  for (let i in items) {
    let item = items[i];
    console.log(`ITEM: ${item.title} / LIKES_COUNT: ${item.likesCount}`)
  }
  // console.log(data);
  /*
  const { data2, errors2 } = await execute(`
    query getUsersUserIdItems {
      getUsersUserIdItems(userId:"ko2ic"){
        title
        likesCount
        user {
          name
          itemsCount
          organization
          description
        }
      }
    }
  `)
  console.log(data2);
  */
}

main();