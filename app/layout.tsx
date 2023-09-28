import "./globals.css";

export const metadata = {
  title: "Quizzer - transforming Texts to Tests",
  description: "Quizzer transforms your reading materials into interactive learning experiences by converting text documents into customizable multiple-choice quizzes, facilitating deeper understanding and engagement for learners, educators, and professionals across diverse topics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
