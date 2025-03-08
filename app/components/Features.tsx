import { UserPlus, Zap, ShieldCheck, MousePointerClick } from "lucide-react";

const features = [
  {
    name: "Sign Up for Free",
    description:
      "Create an account in seconds and start scheduling meetings effortlessly. No hidden costs, no hassle.",
    icon: UserPlus,
  },
  {
    name: "Blazing Fast Scheduling",
    description:
      "Say goodbye to back-and-forth emails! Schedule meetings instantly with our smart, time-saving automation.",
    icon: Zap,
  },
  {
    name: "Enterprise-Grade Security",
    description:
      "Your data is safe with us. We use  Nylas integration to protect your privacy and security.",
    icon: ShieldCheck,
  },
  {
    name: "Intuitive & User-Friendly",
    description:
      "Designed for everyone—whether you're tech-savvy or not. A seamless, hassle-free scheduling experience.",
    icon: MousePointerClick,
  },
];
const Features = () => {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl">
          Schedules Meetings in minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With Calendly you can schedule meetings in minutes. We make it easy to
          schedule meetings in minutes. The meetings are very fast and easy to
          schedule.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="max-w-xl gap-x-8 grid gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
