import React from 'react';

export default function AudioComponent() {
  return (
    <audio controls>
      <source src="https://nsdr.b-cdn.net/new/1%20-%20NSDR.wav" type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
  );
}
