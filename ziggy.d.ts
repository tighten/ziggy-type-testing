declare module './route' {
    interface RouteList {
        'posts.index': [],
        'posts.comments.store': [{ name: 'post' }],
        'posts.comments.show': [{ name: 'post' }, { name: 'comment', binding: 'uuid' }],
        'optional': [{ name: 'maybe' }],
    }
}
export {};
