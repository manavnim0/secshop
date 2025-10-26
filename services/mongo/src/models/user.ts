import mongoose from "mongoose";
import bcrypt from "bcryptjs";


// Interfaces (UserAttrs, UserDoc, UserModel) remain the same
interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    // Add this to automatically clean up the JSON response
    toJSON: {
      transform(doc, ret:Record<string, any>) {
        ret.id = ret._id; // Use 'id' instead of '_id'
        delete ret._id;
        delete ret.password; // IMPORTANT: Never send the password hash
        delete ret.__v;
      },
    },
  }
);

/**
 * Mongoose 'pre-save' hook to hash the password before saving.
 * This function will run automatically whenever `user.save()` is called.
 */
userSchema.pre("save", async function (done) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  done();
});

// Your static 'build' method remains the same
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };


// import mongoose from "mongoose";

// interface UserAttrs {
//   email: string;
//   password: string;
// }

// interface UserDoc extends mongoose.Document {
//   email: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface UserModel extends mongoose.Model<UserDoc> {
//   build(attrs: UserAttrs): UserDoc;
// }

// const userSchema = new mongoose.Schema<UserDoc>(
//   {
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );


// userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export { User };