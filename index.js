import route from './route';

route();

route('postComments.store', {});

route('postComments.show', { comment: {} });

route('postComments.show', [{}, {}]);

route().foo();

route().has('x');

route().params.x