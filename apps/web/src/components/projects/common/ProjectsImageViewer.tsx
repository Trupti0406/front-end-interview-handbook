import clsx from 'clsx';
import { clamp } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { RiLayoutGridLine, RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { useToggle, useWindowSize } from 'usehooks-ts';

import Button from '~/components/ui/Button';

import { useWheel } from '@use-gesture/react';

type Props = Readonly<{
  alt: string;
  aspectRatio: '5/3' | '7/3';
  grid: {
    columnGap: number;
    columns: number;
    containerWidth: number;
    sidePadding: number;
  };
  src: string;
  width: number;
}>;

const MIN_ZOOM_LEVEL = 20;
const MAX_ZOOM_LEVEL = 200;

export default function ProjectsImageViewer({
  alt,
  aspectRatio,
  src,
  width,
  grid,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [showGrid, toggleGrid] = useToggle(false);
  const [imageSmallerThanWrapper, setImageSmallerThanWrapper] = useState({
    height: true,
    width: true,
  });
  const windowSize = useWindowSize();

  function setZoomLevelWithClamp(value: number) {
    setZoomLevel(clamp(value, MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL));
  }

  useEffect(() => {
    setZoomLevel(50);
  }, [src]);

  function recalculate() {
    if (!imageRef.current || !wrapperRef.current) {
      return;
    }

    // The result can be inaccurate depending on whether the image has loaded.
    // Hence we also trigger this function in <img>' onLoad.
    setImageSmallerThanWrapper({
      height: imageRef.current.clientHeight < wrapperRef.current.clientHeight,
      width: imageRef.current.clientWidth < wrapperRef.current.clientWidth,
    });
  }

  useEffect(recalculate, [
    zoomLevel,
    windowSize.width,
    windowSize.height,
    imageRef.current?.clientHeight,
    imageRef.current?.clientWidth,
  ]);

  useWheel(
    (data) => {
      if (data.ctrlKey) {
        data.event.preventDefault();
        setZoomLevelWithClamp(zoomLevel - data.event.deltaY / 50);
      }
    },
    { eventOptions: { passive: false }, target: wrapperRef },
  );

  const { columnGap, sidePadding, columns, containerWidth } = grid;

  return (
    <div className="relative isolate max-h-full">
      <div className="absolute bottom-6 right-6 z-[1] flex flex-col gap-1">
        <Button
          icon={RiLayoutGridLine}
          isLabelHidden={true}
          label="Toggle grid"
          variant="secondary"
          onClick={() => toggleGrid()}
        />
        <Button
          icon={RiZoomInLine}
          isLabelHidden={true}
          label="Zoom in"
          variant="secondary"
          onClick={() => setZoomLevelWithClamp(zoomLevel + 10)}
        />
        <Button
          icon={RiZoomOutLine}
          isLabelHidden={true}
          label="Zoom out"
          variant="secondary"
          onClick={() => setZoomLevelWithClamp(zoomLevel - 10)}
        />
      </div>
      <div
        key={src}
        ref={wrapperRef}
        className={clsx(
          'w-full overflow-auto',
          aspectRatio === '5/3' && 'aspect-[5/3]',
          aspectRatio === '7/3' && 'aspect-[7/3]',
          (imageSmallerThanWrapper.height || imageSmallerThanWrapper.width) &&
            'flex',
          imageSmallerThanWrapper.height ? 'items-center' : 'items-baseline',
          imageSmallerThanWrapper.width ? 'justify-center' : 'justify-baseline',
          'touch-none',
        )}>
        <div className="relative" style={{ width: (width * zoomLevel) / 100 }}>
          {showGrid && (
            <div className="absolute inset-0">
              <div className="h-full">
                <div
                  className="relative mx-auto flex h-full"
                  style={{ width: `${(containerWidth / width) * 100}%` }}>
                  <div
                    className="bg-red/20 h-full"
                    style={{ width: `${(sidePadding / width) * 100}%` }}
                  />
                  <div
                    className="grid h-full grow"
                    style={{
                      gap: `${(columnGap / width) * 100}%`,
                      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    }}>
                    {Array.from({ length: columns }, (_, index) => (
                      <div key={index} className="bg-red/10 h-full" />
                    ))}
                  </div>
                  <div
                    className="bg-red/20 h-full"
                    style={{ width: `${(sidePadding / width) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          <img
            ref={imageRef}
            alt={alt}
            className="pointer-events-none max-w-none touch-none select-none"
            src={src}
            style={{
              width: (width * zoomLevel) / 100,
            }}
            onLoad={recalculate}
          />
        </div>
      </div>
    </div>
  );
}