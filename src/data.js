let data = {
  name: "홍길동",
  age: 20,
  birthday: "2000.01.01",
};

export default {
  template: `
      <div>
          <h1>프로필</h1>
          <p>${data.name}</p>
          <p>${data.age}</p>
          <p>${data.birthday}</p>
      </div>
    `,
};

// export default class User {
//   constructor() {
//     this.data = {
//       name: "홍길동",
//       age: 20,
//       birthday: "2000.01.01",
//     };
//   }

//   template() {
//     return `
//         <div>
//             <h1>프로필</h1>
//             <p>${this.data.name}</p>
//             <p>${this.data.age}</p>
//             <p>${this.data.birthday}</p>
//         </div>
//     `;
//   }
// }
