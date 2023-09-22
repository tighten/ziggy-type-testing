const Ziggy = {
    url: 'http://ziggy.dev',
    port: null,
    defaults: {},
    routes: {
        'posts.index': {
            uri: 'posts',
            methods: ['GET','HEAD'],
        },
        'posts.comments.store': {
            uri: 'posts/{post}/comments',
            methods: ['POST'],
            parameterNames: ['post'],
        },
        'posts.comments.show': {
            uri: 'posts/{post}/comments/{comment:uuid}',
            methods: ['GET','HEAD'],
            parameterNames: ['post'],
        },
        optional: {
            uri: 'opt/{maybe?}',
            methods: ['GET','HEAD'],
            parameterNames: ['maybe'],
        }
    },
};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
