<template>
  <fragment>
    <div id="comments" v-for="comment in this.comments" :key="comment._id">
      <div class="post-comment" v-if="comment.messageId == currentMessage">
        <div class="comment-infos">
          <div class="profile-picture"></div>
          <p>
            Écrit par {{ commentUsername }} •
            {{
              new Date(Date.parse(comment.createdAt))
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
          {{ comment.message }}
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
      commentUsername: '',
    };
  },
  created() {
    this.getUser();
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getUser() {
      let Token = 'Bearer ' + localStorage.getItem('Token');

      for (let comment of this.comments) {
        axios({
          method: 'get',
          url: `http://localhost:3000/api/user/${comment.userId}`,
          headers: {
            Authorization: Token,
          },
        }).then((data) => {
          this.commentUsername = data.data.username;
        });
      }
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
