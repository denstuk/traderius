import * as React from "react";
import Particles from "react-tsparticles";

export const Network: React.FC = () => {
    return (
        <Particles
            id="tsparticles"
            options={{
                background: {
                  opacity: 100
                },
                fpsLimit: 50,
                interactivity: {
                  events: {
                    onClick: {
                      enable: false,
                      mode: "grab",
                    },
                    onHover: {
                      enable: false,
                      mode: "slow",
                    },
                    resize: true,
                  },
                  modes: {
                    bubble: {
                      distance: 400,
                      duration: 2,
                      opacity: 0.8,
                      size: 40,
                    },
                    push: {
                      quantity: 4,
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                    },
                  },
                },
                particles: {
                  color: {
                    value: "#d3d3d3",
                  },
                  links: {
                    color: "#d3d3d3",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                  },
                  collisions: {
                    enable: false,
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outMode: "bounce",
                    random: false,
                    speed: 3,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                      value_area: 800,
                    },
                    value: 120,
                  },
                  opacity: {
                    value: 1,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    random: true,
                    value: 3,
                  },
                },
                detectRetina: true,
                zLayers: 2
              }}
        />
    )
}
