import { Carousel } from "flowbite-react";

function DemoCarousel({children}) {
  return (
    <div className="h-56 sm:h-64 xl:h-full 2xl:h-96 p-6">
      <Carousel>
        {children}
      </Carousel>
    </div>
  );
}

export default DemoCarousel