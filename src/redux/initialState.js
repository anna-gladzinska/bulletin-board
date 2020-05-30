export const initialState = {
  logged: false,
  posts: {
    data: [
      {
        id: '1',
        status: 'Published',
        date: '2020-05-27',
        actualization: '2020-05-27',
        title: 'Lorem Ipsum',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam quam, ullamcorper vitae sem in, lobortis mollis nulla.',
        email: 'johndoe@example.com',
        photo: '',
        price: 500,
        telephone: '700-800-900',
        localization: 'Warsaw',
      },
      {
        id: '2',
        status: 'Published',
        date: '2020-05-30',
        actualization: '2020-05-30',
        title: 'Lorem Ipsum',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam quam, ullamcorper vitae sem in, lobortis mollis nulla.',
        email: 'johndoe@example.com',
        photo: '',
        price: 200,
        telephone: '700-800-900',
        localization: 'New York',
      },
      {
        id: '3',
        status: 'Published',
        date: '2020-05-28',
        actualization: '2020-05-28',
        title: 'Lorem Ipsum',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam quam, ullamcorper vitae sem in, lobortis mollis nulla.',
        email: 'johndoe@example.com',
        photo: '',
        price: 200,
        telephone: '700-800-900',
        localization: 'New York',
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
};
