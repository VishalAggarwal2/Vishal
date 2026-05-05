import Image from 'next/image';

export default function Occupation() {
  return (
    <div className="mb-8 flex flex-col-reverse items-center justify-between sm:flex-row sm:items-center">
      <div className="text-left">
        <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">Vishal Aggarwal</h1>
        <h2 className="text-sm font-normal md:text-base">
          Full Stack Developer &mdash; building scalable apps, APIs &amp; microservices with Java
          Spring Boot, MERN stack, and modern DevOps practices
        </h2>
      </div>
      <div>
        <Image
          alt="Vishal Aggarwal"
          height={30}
          width={100}
          src="/static/images/Vishal.jpeg"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
