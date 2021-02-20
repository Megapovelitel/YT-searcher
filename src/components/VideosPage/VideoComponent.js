import React from 'react'

const VideoComponent = ({videos, listed}) => {
    return (
          <div className={listed ? "container" : "container1"}>
            {videos.map((e, i) => (
            <div className="video" key={i}>
              <iframe
                id="ytplayer"
                width="300px"
                height="250px"
                src={`https://www.youtube.com/embed/${e.id.videoId}`}
                frameBorder={0}
                allowFullScreen
                title={e.id}
              ></iframe>
              <div className="text">
                <h4>{e.snippet.title}</h4>
                <h4>{e.snippet.description}</h4>
                <br />
              </div>
            </div>
          ))}
        </div>
    )
}

export default VideoComponent
