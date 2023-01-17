window.addEventListener("load", () => {
  const app = Vue.createApp({
    data() {
      return {
        users: [],
        user: {
          id: "",
          name: "",
          username: "",
          email: "",
        },
        operation: "Register",
        userIndex: -1,
      };
    },
    created() {
      if (localStorage.getItem("vue3.users") !== null) {
        this.users = JSON.parse(localStorage.getItem("vue3.users"));
      } else {
        this.listUsers();
      }
    },
    mounted() {
      this.$refs.name.focus();
    },
    methods: {
      listUsers: async function () {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        this.users = data.slice(0, 5);
        this.updateLocalStorage();
      },
      processUser: function (event) {
        event.preventDefault();
        //this.user.id=this.users.length+1
        if (this.operation == "Register") {
          this.user.id = this.findMaxId() + 1;
          this.users.push({
            id: this.user.id,
            name: this.user.name,
            username: this.user.username,
            email: this.user.email,
          });
        } else {
            this.users[this.userIndex].name=this.user.name
            this.users[this.userIndex].username=this.user.username
            this.users[this.userIndex].email=this.user.email
        }

        this.updateLocalStorage;
        this.clearUsers();
      },
      editUser(id) {
        this.operation = "Update";
        const userFound = this.users.find((user, index) => {
          this.userIndex = index;
          return user.id == id;
        });
        this.user.name = userFound.name;
        this.user.username = userFound.username;
        this.user.email = userFound.email;
      },

      findMaxId: function () {
        const maxId = Math.max.apply(
          Math,
          this.users.map(function (user) {
            return user.id;
          })
        );
        return maxId;
      },

      updateLocalStorage: function () {
        localStorage.setItem("vue3.users", JSON.stringify(this.users));
      },
      deleteUser: function (id, event) {
        const confirmation = confirm("Quieres eliminar el elemento?");
        if (confirmation) {
          this.users = this.users.filter((user) => user.id !== id);
          this.updateLocalStorage();
        } else {
          event.preventDefault();
        }
      },
      clearUsers: function () {
        this.user.id = "";
        this.user.name = "";
        this.user.username = "";
        this.user.email = "";
        this.operation = "register";
        this.$refs.name.focus();
      },
    },
  });
  app.mount("#app");
});
