<template>
  <div class="edit-form">
    <router-link to="/" class="back-link">
      <span>&larr; Back</span>
    </router-link>
    <button v-on:click="isEditMode = !isEditMode" class="btn-icon" v-bind:class="{ active: isEditMode }">&#9998;</button>
    <form v-on:submit.prevent="onSubmit">
      <h4 class="form-item" v-if="!isEditMode">{{ wish.name }}</h4>

      <div class="form-item" v-if="isEditMode">
        <label>Name:</label>
        <input
          class="form-item-input"
          type="text"
          name="name"
          v-model="wish.name"
        />
      </div>

      <div class="form-item" v-if="!isEditMode">
        {{wish.description}}
      </div>

      <div class="form-item" v-if="isEditMode">
        <label>Description:</label>
        <textarea
          class="form-item-input"
          name="descr"
          v-model="wish.description"
          rows="4"
        ></textarea>
      </div>

      <div class="form-item" v-if="isEditMode">
        <label>Link to image:</label>
        <input
          class="form-item-input"
          type="text"
          name="link"
          v-model="wish.pic"
        />
      </div>

      <div class="form-item" v-if="isEditMode">
        <label>Upload pic:</label>
        <input class="form-item-input" type="file" accept="image/*" name="file" v-on:change="uploadFile" />
        <button v-on:click="uploadImg">Upload</button>
      </div>

      <div>
        <img :src="wish && wish.pic" width="600" />
      </div>

      <div class="centered" v-if="isEditMode">
        <button class="btn">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import service from "../services/service";

export default {
  name: "EditItem",
  created() {
    this.getItemById();
  },
  data: () => ({
    wish: {},
    uploadedFile: { name: "" },
    uploaded: false,
    isEditMode: false,
  }),
  methods: {
    getItemById() {
      service.getItemById(this.$route.params.id).then((res) => {
        this.wish = res.data;
      });
    },
    onSubmit() {
      service.updateItem(this.wish._id, this.wish).then(data => {
        this.isEditMode = false;
      });
    },
    onUpload() {
      service.uploadItem(this.uploadedFile);
    },
    uploadFile(event) {
      this.uploadedFile = event.target.files[0];
    },
    uploadImg(event) {
      event.preventDefault();
      if (this.uploadedFile) {
        service.uploadItem(this.uploadedFile).then((data) => {
          this.uploaded = true;
          this.wish.pic = '/uploads/' + this.uploadedFile.name || '';
        });
      }
    }
  },
};
</script>

<style scoped>
.edit-form {
  position: relative;
  width: 800px;
  margin: 32px auto 24px;
  padding: 48px 48px 24px 32px;
  border: 1px solid #e3ecf9;
  border-radius: 4px;
}

.wishlist-wrapper {
  width: 1024px;
  margin: 0 auto;
}

.form-item {
  margin-bottom: 18px;
}

.form-item label {
  display: inline-block;
  width: 10rem;
}

.form-item-input {
  width: 30rem;
  padding: 6px 12px;
  font-family: Verdana, sans-serif;
  font-size: 15px;
  vertical-align: middle;
  border: 2px solid transparent;
  box-shadow: inset 0px 0px 1px 1px #cacaca;
}

.form-item-input:focus {
  outline: none;
  border: 2px solid #77d4bb;
  box-shadow: none;
}

.form-item-input[type="file"],
.form-item-input[type="file"]:focus {
  padding-left: 2px;
  border: none;
  box-shadow: none;
}

.btn {
  margin-top: 12px;
}

.btn-icon {
  position: absolute;
  top: 12px;
  right: 12px;
}

.btn-icon.active {
  background: #d4f9f9;
}

.back-link {
  position: absolute;
  top: 12px;
  color: #1eb9b9;
}
</style>