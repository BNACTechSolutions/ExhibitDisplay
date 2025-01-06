import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center my-9 font-semibold">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="sm"
      className="mb-3 font-medium sm:text-left text-center"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-base font-medium font-body text-slate-600 sm:text-left text-center">
      {children}
    </p>
  ),
};

const icons = {
  calendar: <CalendarIcon />,
  bargraph: <BargraphIcon />,
  clover: <CloverIcon />,
  hourglass: <HourGlassIcon />,
};

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="pb-12">
        <PrismicRichText
          components={components}
          field={slice.primary.heading}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 max-w-full gap-x-8 gap-y-12 sm:place-items-start place-items-center">
          {slice.primary.card.map((item, index) => (
            <div
              key={index}
              className="max-w-xs grid sm:place-items-start place-items-center"
            >
              {item.icon && <div className="mb-5">{icons[item.icon]}</div>}
              <PrismicRichText components={components} field={item.title} />
              <PrismicRichText
                components={components}
                field={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Features;

// Icons
function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <path
        stroke="#0891B2"
        strokeWidth="4.99"
        d="M6.67 40c0-12.57 0-18.86 3.9-22.76 3.9-3.9 10.2-3.9 22.76-3.9h13.34c12.57 0 18.85 0 22.76 3.9 3.9 3.9 3.9 10.19 3.9 22.76v6.67c0 12.57 0 18.85-3.9 22.76-3.9 3.9-10.2 3.9-22.76 3.9H33.33c-12.57 0-18.85 0-22.76-3.9-3.9-3.9-3.9-10.2-3.9-22.76V40z"
      ></path>
      <path
        stroke="#0891B2"
        strokeLinecap="round"
        strokeOpacity="0.5"
        strokeWidth="4.99"
        d="M23.33 13.33v-5m33.34 5v-5M8.33 30h63.34"
      ></path>
      <path
        fill="#0891B2"
        d="M60 56.67a3.33 3.33 0 11-6.67 0 3.33 3.33 0 016.67 0zm0-13.34a3.33 3.33 0 11-6.67 0 3.33 3.33 0 016.67 0zM43.33 56.67a3.33 3.33 0 11-6.66 0 3.33 3.33 0 016.66 0zm0-13.34a3.33 3.33 0 11-6.66 0 3.33 3.33 0 016.66 0zM26.67 56.67a3.33 3.33 0 11-6.67 0 3.33 3.33 0 016.67 0zm0-13.34a3.33 3.33 0 11-6.67 0 3.33 3.33 0 016.67 0z"
      ></path>
    </svg>
  );
}

function BargraphIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <path
        stroke="#0891B2"
        strokeLinecap="round"
        strokeWidth="4.99"
        d="M73.33 73.33H6.67"
      ></path>
      <path
        stroke="#0891B2"
        strokeOpacity="0.5"
        strokeWidth="4.99"
        d="M70 73.33v-25a5 5 0 00-5-5H55a5 5 0 00-5 5v25"
      ></path>
      <path
        stroke="#0891B2"
        strokeWidth="4.99"
        d="M50 73.33V16.67c0-4.72 0-7.07-1.46-8.54C47.07 6.67 44.7 6.67 40 6.67c-4.71 0-7.07 0-8.54 1.46C30 9.6 30 11.95 30 16.67v56.66"
      ></path>
      <path
        stroke="#0891B2"
        strokeOpacity="0.5"
        strokeWidth="4.99"
        d="M30 73.33V31.67a5 5 0 00-5-5H15a5 5 0 00-5 5v41.66"
      ></path>
    </svg>
  );
}

function CloverIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <path
        stroke="#0891B2"
        strokeOpacity="0.5"
        strokeWidth="4.99"
        d="M26.67 26.67h26.66v26.66H26.67V26.67z"
      ></path>
      <path
        stroke="#0891B2"
        strokeWidth="4.99"
        d="M53.33 53.34h10a10 10 0 11-10 10v-10zm-26.66 0h-10a10 10 0 1010 10v-10zm26.66-26.67h10a10 10 0 10-10-10v10zm-26.66 0h-10a10 10 0 1110-10v10z"
      ></path>
    </svg>
  );
}

function HourGlassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <path
        stroke="#0891B2"
        strokeWidth="4.99"
        d="M49.86 30.24L40 40l-9.86-9.76C20.4 20.59 15.53 15.77 16.9 11.6c.12-.35.26-.7.44-1.04 2-3.9 8.9-3.9 22.67-3.9 13.78 0 20.66 0 22.67 3.9.17.34.32.69.44 1.04 1.36 4.17-3.51 8.99-13.25 18.64z"
      ></path>
      <path
        stroke="#0891B2"
        strokeOpacity="0.5"
        strokeWidth="4.99"
        d="M30.14 49.76L40 40l9.86 9.76C59.6 59.41 64.47 64.23 63.1 68.4c-.12.36-.27.71-.44 1.05-2 3.9-8.9 3.9-22.67 3.9-13.78 0-20.67 0-22.67-3.9a7.1 7.1 0 01-.44-1.05c-1.36-4.16 3.5-8.98 13.25-18.63z"
      ></path>
    </svg>
  );
}
