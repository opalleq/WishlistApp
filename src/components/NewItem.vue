<template>
  <div class="create-form">
    <h2 class="create-form-header">Make a new wish!</h2>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-item">
        <label>What I want:</label>
        <input class="form-item-input" type="text" name="name" v-model="name" />
      </div>

      <div class="form-item">
        <label>Some words about:</label>
        <textarea
          class="form-item-input"
          name="descr"
          v-model="description"
        ></textarea>
      </div>

      <div class="form-item">
        <label>Link to image:</label>
        <input
          class="form-item-input"
          type="text"
          name="link"
          v-model="picLink"
        />
      </div>

      <div class="form-item">
        <label>Upload pic:</label>
        <input
          class="form-item-input"
          type="file"
          accept="image/*"
          name="file"
          v-on:change="uploadFile"
        />
        <button v-on:click="uploadImg">Upload</button>
      </div>

      <div class="centered">
        <button
          v-bind:class="['btn', { disabled: isDisabled }]"
          :disabled="isDisabled"
        >
          Create a wish!
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import service from "../services/service";
import { listener } from "../main";

export default {
  name: "NewItem",
  data: () => ({
    wishes: [],
    wish: {},
    name: "",
    description: "",
    picLink: "",
    uploadedFile: { name: "" },
    uploaded: false,
  }),
  methods: {
    onSubmit() {
      const data = {
        name: this.name || "",
        description: this.description || "",
        pic:
          (this.uploaded
            ? "/uploads/" + this.uploadedFile.name
            : this.picLink) || "",
      };
      service.addItem(data).then((data) => {
        listener.$emit("itemsListUpdated");
        this.clearForm();
      });
    },
    onUpload() {
      service.uploadItem(this.uploadedFile);
    },
    clearForm() {
      this.name = "";
      this.description = "";
      this.picLink = "";
    },
    uploadFile(event) {
      this.uploadedFile = event.target.files[0];
    },
    uploadImg(event) {
      event.preventDefault();
      if (this.uploadedFile) {
        service.uploadItem(this.uploadedFile).then((data) => {
          this.uploaded = true;
        });
      }
    },
  },
  computed: {
    isDisabled: function () {
      return !this.name && !this.description && !this.picLink;
    },
  },
};
</script>

<style scoped>
.create-form {
  width: 600px;
  margin: 32px auto 24px;
  padding: 12px 32px 24px;
  border: 1px solid #e3ecf9;
  border-radius: 4px;
}

.create-form-header {
  color: #1eb98e;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
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
  width: 20rem;
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
</style>