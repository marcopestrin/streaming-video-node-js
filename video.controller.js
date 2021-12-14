
const fs = require("fs");

const streamVideo = (req, res) => {
  try {
    const range = req.headers.range;
    const videoId = req.params.videoId;
  
    if (!range) {
      res.status(400).send("Range not provided");
      return;
    }
  
    const videoPath = `./videos/${videoId}.mp4`;
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 10 ** 6; // 1 MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}


module.exports = {
  streamVideo
};