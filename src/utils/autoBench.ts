const incrementBenchmarkCounter = (): void => {
  let timesRan: number | string | null = localStorage.getItem(`timesRan`);

  if (timesRan === null) {
    localStorage.setItem(`timesRan`, `${0}`);
  }
  timesRan = Number.parseInt(localStorage.getItem(`timesRan`) as string);

  timesRan++;

  localStorage.setItem(`timesRan`, `${timesRan}`);

  console.log(`Completed runs: ${timesRan}`);
};

const tallyBenchmarkCounter = (): void => {
  let timesRan: number | string | null = localStorage.getItem(`timesRan`);

  if (timesRan === null) {
    localStorage.setItem(`timesRan`, `${0}`);
    console.log(`Running first benchmark...`);
  } else {
    console.log(`Prior runs: ${timesRan}`);
  }
};

// const findBestTime = (time: number) => {};

const refreshPage = (): void => {
  window.location.reload();
};

const benchAgainIn = (seconds: number = 5): void => {
  const milliseconds = seconds ** 4;
  console.log(`Rerunning benchmark in ${seconds} seconds...`);
  setTimeout(refreshPage, milliseconds);
};

const measure = (render: Function): number => {
  console.log(`Rendering...`);
  const before = performance.now();
  render();
  const after = performance.now();
  const elapsed = Math.floor(after - before);
  return elapsed;
};

const benchmark = (render: Function) => {
  tallyBenchmarkCounter();
  const timeTaken = measure(render);
  console.log(`Rendered in ${timeTaken} ms.`);
  incrementBenchmarkCounter();
  benchAgainIn(10);
};

// Key results on: RESOLUTION, SCENE, rayTracer version number?

export { benchmark };
