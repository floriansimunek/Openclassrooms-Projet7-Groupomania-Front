<template>
  <fragment>
    <div id="comments">
      <div class="post-comment">
        <div class="comment-infos">
          <div class="profile-picture"></div>
          <p>
            Écrit par {{ this.user.username }} •
            {{
              new Date(Date.parse(this.createdAt))
                .toLocaleDateString('fr', {
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })
                .replace(':', 'h')
            }}
          </p>
        </div>
        <p class="comment-text">
          {{ this.comment }}
        </p>
      </div>
    </div>
  </fragment>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Comments',
  data() {
    return {
      currentMessage: this.$route.params.messageId,
      user: [],
    };
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: `http://localhost:3000/api/user/${this.userId}`,
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        this.user = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* Comments */
#comments {
  @media screen and(min-width: 992px) {
    padding-left: 10%;
  }

  .post-comment {
    width: 90%;
    margin: 15px auto;
    margin-right: 10px;
    border-radius: 5px;
    background: #fff;
    padding: 5px 0;

    @media screen and(min-width: 992px) {
      width: 70%;
      margin-right: auto;
    }

    .comment-infos {
      display: flex;
      margin: 15px auto;
      justify-content: space-around;
      align-items: center;

      @media screen and(min-width: 992px) {
        justify-content: left;
      }

      .profile-picture {
        width: 50px;
        height: 50px;
        background: gray;

        @media screen and(min-width: 992px) {
          margin: 0 15px;
        }
      }
    }

    .comment-text {
      margin: 10px;
      text-align: justify;
    }
  }
}
</style>
