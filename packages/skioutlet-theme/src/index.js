import Root from "./components"
import link from "@frontity/html2react/processors/link";

const skioutletTheme = {
  name: "skioutlet-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {},
    source: {
      data: {
        "/shop/": {
          isShop: true,
          isReady: true
        },
        "/versenyek/": {
          isReady: true,
          isRace: true
        }
      }
    },  
  },
  actions: {
    theme: {},
  },
  libraries: {
    source: {
      handlers: [
        {
          pattern: "/shop/termek/:id",
          func: ({ state, link, params }) => {
            state.source.data[link] = {
              isItem: true,
              id: params.id
            }
          }
        },
        {
          pattern: "/shop/oldal/:id",
          func: ({ state, link, params }) => {
            state.source.data[link] = {
              isPagination: true,
              id: params.id
            }
          }
        },
        {
          pattern: "/shop/:id",
          func: ({ state, link, params }) => {
            state.source.data[link] = {
              isSearch: true,
              id: params.id
            }
          }
        },
        {
          pattern: "/versenyek/",
        init: ({ libraries }) => {
          libraries.source.handlers.push({
            name: "custom_category",
            priority: 100,
            pattern: "/",
            func: async ({ link, params, state, libraries, force }) => {
             
              // 1. get all posts for the category
              const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { categories: 1780 },
              });
  
              // 2. add items to state
              const items = await libraries.source.populate({
                response,
                state,
                force,
              });
  
              const { type, id } = state.source.get("/");
  
              // 3. add link to data. 
              // Might need to add more details to the state 
              // (look at the examples of other 
              // handlers in the frontity repo)
              Object.assign(state.source.data[link], {
                id,
                type,
                isHome: true,
                isArchive: true,
                items,
              });
            },
          });
        },
      }
      ]
    },
    html2react: {
      processors: [link]
    }
  },
}

export default skioutletTheme