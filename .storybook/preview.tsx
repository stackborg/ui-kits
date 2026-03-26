import type { Preview } from "@storybook/react-vite";
import "./styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "hsl(0 0% 100%)" },
        { name: "dark", value: "hsl(0 0% 3.9%)" },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      // Apply .dark class when dark background is selected
      const isDark = context.globals?.backgrounds?.value === "hsl(0 0% 3.9%)";
      return (
        <div className={isDark ? "dark" : ""}>
          <div
            style={{
              padding: "2rem",
              backgroundColor: "hsl(var(--ui-background))",
              color: "hsl(var(--ui-foreground))",
              minHeight: "100vh",
            }}
          >
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
