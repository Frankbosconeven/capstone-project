const Post = require("./post.model");
const createHttpError = require("http-errors")

const verifyAuthor = (req, post) => {
    const {id} = req.user;
    if (post.author === id) {
        throw createHttpError(403, "You canot perform this task")
    }
}
exports.getAllPosts = async (req, res, next) => {
    try {
        const post = await Post.find({ published: true });
        res.status(200).json(({ post }));
    } catch (error) {
        next(createHttpError(500, error.message))
    }
};

exports.createPost = async (req, res, next ) => {
    try {
        const {tittle, body, imageUrl} = req.body

        const post = await post.create({
            tittle,
            body,
            imageUrl,
            author: req.user.id
        })
    } catch (error) {
        next(createHttpError(500, error.message))
    }
};
exports.getSinglePost = async (req, res, next) => {
    try {
        const {postId} = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            next(createHttpError(404, "Post not found"))
        }
    } catch (error) {
        next(createHttpError(500), error.message)
    }
};
exports.updatePost = async (req, res, next) => {
    try {
        const { postId } = req.body;
        let post = await Post.findById(postId);
        verifyAuthor(req, post);

        post = await Post.findByIdAndUpdate(postId, {...req.body},
             {new: true }
             );
             req.status(200).json({ post })
    } catch (error) {
        next(createHttpError(500), error.message)
    }
};
exports.deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        let post = await Post.findById(postId);
        verifyAuthor(req, post);

        await Post.findByIdAndDelete({msg: "Post has been deleted successful"}
        );
        res.status(200).json({ postId })
        
    } catch (error) {
        next(createHttpError(500), error.message)
    }
}