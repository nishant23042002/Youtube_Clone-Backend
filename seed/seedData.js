// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from '@faker-js/faker';
import User from "../models/User.model.js";
import Channel from "../models/Channel.model.js";
import Video from "../models/Video.model.js";
import Comment from "../models/Comment.model.js";
import { DATABASE_NAME } from "../utils/constants.js";

dotenv.config();

const TOTAL_USERS = 5;
const VIDEOS_PER_USER = 3;
const COMMENTS_PER_VIDEO = 2;

const allUsers = [];
async function seed() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DATABASE_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("🟢 Connected to DB");

        // Clear previous data
        await User.deleteMany();
        await Channel.deleteMany();
        await Video.deleteMany();
        await Comment.deleteMany();

        for (let i = 0; i < TOTAL_USERS; i++) {

            const user = await User.create({
                userName: faker.internet.username(),
                email: faker.internet.email(),
                password: "1234",
                profilePicture: faker.image.avatarGitHub()
            });
            allUsers.push(user);
            const channel = await Channel.create({
                name: `${user.userName}'s Channel`,
                description: faker.lorem.sentence(),
                profilePicture: faker.image.avatarGitHub(),
                owner: user._id,
                subscribers: [],
            });

            for (let j = 0; j < VIDEOS_PER_USER; j++) {
                const video = await Video.create({
                    title: faker.lorem.words(5),
                    thumbnail: faker.image.urlPicsumPhotos({ width: 640, height: 360 }),
                    videoFile: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
                    description: faker.lorem.paragraph(),
                    channelId: channel._id,
                    uploader: user._id,
                    views: faker.number.int({ min: 0, max: 10000 }),
                    likes: faker.number.int({ min: 0, max: 100 }),
                    disLikes: 0,
                    uploadDate: new Date(),
                    isAvailable: true
                });

                for (let k = 0; k < COMMENTS_PER_VIDEO; k++) {
                    const randomUser = allUsers
                        .filter(u => u._id.toString() !== user._id.toString())
                        .sort(() => 0.5 - Math.random())[0];

                    if (randomUser) {
                        await Comment.create({
                            videoId: video._id,
                            userId: randomUser._id,
                            text: faker.lorem.sentence(),
                            createdAt: new Date(),
                            likes: faker.number.int({ min: 0, max: 100 }),
                        });
                    }
                }
            }
        }

        console.log("✅ Dummy data seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("❌ Error seeding data:", err);
        process.exit(1);
    }
}

seed();
