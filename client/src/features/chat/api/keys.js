



export const chatKeys = {
    all: ['chat'],
    lists: () => [...chatKeys.all, 'lists'],
    messages: (chatId) => [...chatKeys.all, 'messages', chatId]
}