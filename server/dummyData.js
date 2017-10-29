import Post from './models/post';
import User from './models/user';
import Offer from './models/offer';

export default function () {
  Post.count().exec((err, count) => {
    if (count === 0) {
      console.log("creating dummy posts");
      const content1 = `Sed ut perspiciatis unde omnis iste natus error
        sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
        vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
        qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
        ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum`;

      const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum. Sed ut perspiciatis unde omnis iste natus error
        sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
        vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
        qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
        ipsum quia dolor sit amet.`;

      const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
      const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });
    
      Post.create([post1, post2], (error) => {
        if (!error) {
          // console.log('ready to go....');
        }
      });
    }
  });

  User.count().exec((err, count) => {
    if (count === 0) {
      console.log("creating dummy users");
      const user1 = new User({ name: 'Antony Yun', username: 'AntonyY', password: 'a', cuids: ['a', 'c'] });
      const user2 = new User({ name: 'Daniel Wong', username: 'DanielW', password: 'a', cuids: ['b'] });

      User.create([user1, user2], (error) => {
        if (error) {
          console.log('error creating dummy users');
        }
      });
    }
  });

  Offer.count().exec((err, count) => {
    if (count === 0) {
      console.log("creating dummy offers");
      const offer1 = new Offer({ username: 'AntonyY', companyName: 'Nonexistent', cuid: 'a', salaryFormat: 'hourly', salary: 10000, duration: 10, location: 'Austin', corporateHousing: 'false', housingStipend: 10, meals: 21});
      const offer2 = new Offer({ username: 'DanielW', companyName: 'Microbook', cuid: 'b', salaryFormat: 'weekly', salary: 1, duration: 12, location: 'San Franscisco', corporateHousing: 'false', housingStipend: 400, meals: 5});
      const offer3 = new Offer({ username: 'AntonyY', companyName: 'OurDearSoftware', cuid: 'c', salaryFormat: 'hourly', salary: 10000, duration: 10, location: 'Seattle', corporateHousing: 'false', housingStipend: 10, meals: 21});
      Offer.create([offer1, offer2, offer3], (error) => {
        if (error) {
          console.log('error creating dummy offers');
        }
      });
    }
  }); 
}
