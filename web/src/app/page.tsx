import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Logo
        text="Brainloop"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor=""
        strokeColor=""
        minFontSize={36}
        className="text-primary"
      />
    </main>
  );
}
