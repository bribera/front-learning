import Image from "next/image";
import Link from "next/link";
import Footer from "@/src/components/landing/Footer";
import Testimonial from "@/src/components/landing/Testimonial";
import NewsSection from "@/src/components/landing/Newssection";

const success = [
  { number: "15K+", label: "Students" },
  { number: "75%", label: "Total success" },
  { number: "35", label: "Main questions" },
  { number: "26", label: "Chief experts" },
  { number: "16", label: "Years of experience" }
]

const features = [
  { title: "Online Billing, Invoicing, & Contracts",
    description: "Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts", 
    image: "/images/file.svg" },
  { title: "Easy Scheduling & Attendance Tracking", 
    description: "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance",
    image: "/images/calendar.svg" },
  { title: "Customer Tracking", 
    description: "Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization ", 
    image: "/images/people.svg" },
]

const interfaces =[
  {
    image: "/images/interface1.png",
    text: "Teachers don’t get lost in the grid view and have a dedicated Podium space."
  },
  {
    image: "/images/interface2.png",
    text: "TA’s and presenters can be moved to the front of the class."
  },
  {
    image: "/images/interface3.png",
    text: "Teachers can easily see all students and class data at one time."
  }
]

export default function Home() {
  return (
    <div className="">
      <section>
        <div className="relative w-full h-screen min-h-[848px] max-h-[1118px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/header.png" alt="Hero Image" className="w-full h-full" />
          </div>
          <div className="absolute inset-0 z-10 flex items-center  px-8 lg:pl-[100px] lg:pr-[100px] 3xl:pl-[140px] px-8 3xl:pr-[118px] overflow-hidden">
            {/* text */}
            <div className=" flex flex-col max-w-[681px] z-20 mr-[60px]">
              <p className="text-white text-[32px] lg:text-[44px] xl:text-[54px] w-[80%] xl:w-[99%] font-semibold"><span className="text-[#F48C06]">Studying</span> Online is now much easier</p>
              <p className="pb-[52px] pt-[34px] w-[63%] xl:w-[80%]  text-white text-[18px] xl:text-[24px] leading-auto tracking-[2%] font-normal">TOTC is an interesting platform that will teach you in more an interactive way</p>
              <div className=" flex items-center gap-[40px]">
                <button className="bg-white/30 text-white font-medium text-[16px] lg:text-[20px] xl:text-[24px] leading-auto tracking-[0%] px-[12px] py-[12px] lg:px-[20px] lg:py-[12px] xl:px-[38px] xl:py-[22px] rounded-[81px] hover:bg-white/50 hover:text-[#F48C06]">
                  Join for free
                </button>
                <button className="font-normal flex items-center text-[24px] leading-auto tracking-[0%] ">
                  <div className="bg-white flex justify-center items-center w-[40px] h-[40px] lg:w-[70px] lg:h-[70px] 3xl:h-[80px] 3xl:w-[80px] px-3 py-3 lg:py-[22px] xl:px-[22px] xl:pt-[24px] xl:pb-[22.67px] mr-[18px] lg:mr-[22px] xl:mr-[32px] rounded-full">
                    <img src="/images/play.png" alt="play button" className="w-[16px] h-[16px] lg:w-[33.33px] lg:h-[32px]"/>
                  </div>
                  <p className="text-[18px] lg:text-[20px] xl:text-[24px] text-[#252641]">Watch how it works</p>
                </button>
              </div>
            </div>
            {/* image */}
              <div className="absolute md:-bottom-3 right-0 xl:bottom-1 lg:h-[708px] xl:h-[892px] lg:right-[31px] xl:right-[162px] hidden md:block md:opacity-20 lg:opacity-100 3xl:right-[118px] 3xl:h-[1000px] 3xl:w-[700px] w-auto h-full object-contain object-bottom rounded-[20px] overflow-hidden
              /* Variables pour sm and md */
             [clip-path:ellipse(133%_99%_at_36%_0%)]
              
             /* Variables pour lg */
             lg:[clip-path:ellipse(133%_99%_at_36%_0%)]
             
             /* Variables pour xl */
             xl:[clip-path:ellipse(150%_100%_at_36%_0%)]
              "
             //  style={{
                // On crée une découpe en forme d'ellipse inversée pour suivre la courbe blanche
                // clipPath: 'ellipse(150% 100% at 36% 0%)',
                // Note: 'at 50% 0%' signifie que le haut de l'image est gardé, 
                // et le bas est coupé selon l'arrondi de l'ellipse.
                // }}
              >
                <img src="/images/girl.png" alt="Hero Image" className="h-full w-auto object-contain object-bottom" />
              </div>
              <div className="absolute z-30 bottom-[196px] xl:bottom-[185px] right-[31px] xl:right-[118px]   lg:block opacity-20 md:opacity-0 lg:opacity-100 pointer-events-none">
                <img src="/images/popup.png" alt="Pop up Image" className="w-[490px] lg:w-[500px] lg:h-[290px] xl:w-[768px] xl:h-[509px] object-contain" />
              </div>
          </div>
        </div>
      </section>

      {/* Succes */}
      <section className="mt-[90px] mb-[90px] lg:mt-[134px] lg:mb-[131px] mx-auto px-[40px] lg:px-auto">
        <div className="flex flex-col items-center justify-center pt-16">
          <h2 className=" text-[48px] font-bold leading-[130%] buenos">Our Success</h2>
          <p className="pt-[16px] pb-[101px] text-center lg:w-[79%] 3xl:w-[43%] text-[18px] leading-[160%] text-[#010514]/80 buenos font-normal">Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci. </p>
        </div>
        <div className="flex flex-col justify-center md:grid grid-cols-2 lg:grid-cols-5 place-items-center gap-20 gap-y-10 3xl:gap-[95px] px-10 3xl:pl-[196px] 3xl:pr-[197px]">
                {success.map((item, index) => (
                  <div key={index} className="flex flex-col items-center justify-center">
                    <span className="text-[32px] lg:text-[56px] 3xl:text-[96px] leading-[100%] font-light bg-gradient-to-r from-[#136CB5] to-[#49BBBD] bg-clip-text text-transparent buenos">{item.number}</span>
                    <p className="text-[20px] lg:text-[27px] 3xl:text-[32px] leading-[130%] font-normal text-[#010514]/80 buenos">{item.label}</p>
                  </div>
                ))}
        </div>
      </section>

      {/* All in one */}
      <section className="px-[40px] 3xl:px-[196px]">
        <div className="flex flex-col pb-[103px] items-center text-center">
          <h1 className="text-[36px] font-semibold leading-[180%] text-[#2F327D]">All-in-One <span className="text-[#00CBB8]">Cloud Software.</span></h1>
          <p className="pt-5  text-[24px] font-normal leading-[180%] text-[#696984]">TOTC is one powerful online software suite that combines all the tools needed to run a successful school or office.</p>
        </div>
        <div className="grid grid-cols-1 gap-y-20 w-full place-items-center lg:grid-cols-3 gap-[32px] lg:gap-[60px] px-4 md:px-8 px-16 text-center">
                {
                  features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center justify-center relative bg-white shadow-[0px_10px_60px_rgba(38,45,118,0.08)] rounded-[20px] w-[300px] h-[420px] 3xl:w-[450px] 3xl:h-[430px] ">
                      <img src={feature.image} alt={feature.title} className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] object-contain" />
                      <h3 className="text-[30px] lg:text-[20px] 3xl:pl-[54px] 3xl:pr-[53px] font-semibold leading-[180%] text-[#2F327D] w-[76.22%] pb-[24px]">{feature.title}</h3>
                      <p className="text-[20px] lg:text-[18px] xl:text-[20px] font-normal leading-[180%] text-[#696984] pl-[55px] pr-[54px] pb-[50px]">{feature.description}</p>
                    </div>
                  ))
                }
        </div>
      </section>

      {/* TOTC */}
      <section className="px-[40px] py-[40px] lg:py-[160px] lg:px-[40px] 3xl:px-[310px]">
        <div className="pb-[77px] flex flex-col items-center">
          <h1 className="text-[32px] lg:text-[44px] font-semibold leading-[180%] text-[#2F327D]">What is <span className="text-[#00CBB8]">TOTC</span></h1>
          <p className="3xl:w-[57.34%] text-center pt-5 text-[24px] font-normal leading-[180%] text-[#696984]">TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[100px]">
          <div className="relative 3xl:w-[600px] 3xl:h-[403px]">
            <img src="/images/instructor.png" alt="TOTC Image" className="object-contain" />
            <div className="absolute w-full h-full flex flex-col justify-center items-center left-0 top-0 text-white">
              <h5 className="text-[26px] 3xl:text-[32px]  font-semibold text-center pb-[17px]"> FOR INSTRUCTORS</h5>
              <button className="bg-none text-white px-[19px] py-[12px] 3xl:pt-[24px] 3xl:pb-[23px] 3xl:pr-[38px] 3xl:pl-[37px] rounded-[80px] border border-white text-[18px] 3xl:text-[22px]">Start a class today</button>
            </div>
          </div>   
          <div className="relative 3xl:w-[600px] 3xl:h-[403px]">
            <img src="/images/student.png" alt="TOTC Image" className="object-contain" />
            <div className="absolute w-full h-full flex flex-col justify-center items-center left-0 top-0 text-white">
              <h5 className="text-[26px] 3xl:text-[32px]  font-semibold text-center pb-[17px]"> FOR STUDENTS</h5>
              <button className="bg-[#23BDEE]/90 text-white px-[19px] py-[12px] 3xl:pt-[24px] 3xl:pb-[23px] 3xl:pr-[38px] 3xl:pl-[37px] rounded-[80px] text-[18px] 3xl:text-[22px]">Enter acces code</button>
            </div>
          </div>   
        </div>
      </section>

      {/* Everythings */}
      <section className="mb-[160px] px-[49px] 3xl:pl-[186px] 3xl:pr-[187px] h-full">
        <div className="flex h-full flex-col lg:flex-row gap-[67px] pt-[44px]">
          <div className="flex-1 relative pt-[13px] px-[25px]">
            <div className="absolute -z-1 w-[73px] h-[73px] bg-[#33EFA0] rounded-full absolute top-0 left-0"></div>
            <div className="w-full">
              <h2 className="text-[32px] 3xl:text-[36px] font-medium leading-[160%] text-[#2F327D]">Everything you can do in a physical classroom, <span className="text-[#00CBB8]">you can do with TOTC</span></h2>
              <div className="relative my-[30px] text-[21px] 3xl:text-[24px] leading-[160%] 3xl:leading-[180%] text-[#696984] tracking-[2%] font-normal">
                TOTC’s school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
                <div className="absolute -z-1 w-[30px] h-[30px] bg-[#33EFA0] rounded-full absolute bottom-[69px] right-[9px]"></div>
              </div>
              <div>
                <Link href="/" className="text-[#696984] underline text-[22px] leading-[180%] font-normal">Learn more</Link>
              </div>
            </div>
          </div>

          <div className="flex-1 p-[20px] relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:h-[512px]">
            <div className="hidden lg:block w-[138px] h-[138px] -z-1 top-0 left-0 bg-[#23BDEE] rounded-[20px] absolute "></div>
            <div className="3xl:w-[705px] h-[471.08px]  absolute top-[20px] left-[20px] right-[25px]">
              <img src="/images/everything.png" alt="Everything with TOTC" className="w-full rounded-[20px] h-full object-cover object-center" />
            </div>
            <div className="hidden lg:block w-[231px] h-[231px] -z-1 bottom-0 right-0 bg-[#33EFA0] rounded-[20px] absolute "></div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="pb-[57px] px-[40px] 3xl:pl-[150px] 3xl:pr-[170px]">
        <div className="relative h-[1344.97px]">
          <div className="mb-[100px] flex flex-col justify-center items-center">
            <h5 className="text-[36px] leading-[180%] font-bold text-[#2F327]">Our <span className="text-[#00CBB8]">Features</span></h5>
            <p className="text-[#696984] text-[20px] lg:text-[24px] font-normal text-center">This very extraordinary feature, can make learning activities more efficient</p>
          </div>
          <div className="relative h-[1122.47px]">
            <div className="absolute -z-1 w-[140px] h-[140px] bg-[#33EFA0] opacity-20 lg:opacity-100 rounded-full top-0 left-[63px]"></div>
            <div className="absolute -z-1 w-[30px] h-[30px] bg-[#23BDEE] rounded-full top-[8px] left-[223px]"></div>
            <div className=" absolute pb-[] lg:pb-[184px] top-[76px] left-0 flex gap-[126px]">
              <div className="hidden lg:block w-full h-full">
                <img src="/images/feat1.png" alt="Feature 1" className="w-full h-full object-cover object-center" />
              </div>
              <div className="w-full pr-[16px]">
                <h5 className="pb-[51px] text-[24px] lg:text-[40px] font-semibold leading-[160%] text-[#2F327D]">A <span className="text-[#00CBB8]">user interface</span> designed for the classroom</h5>
                <ul>
                  {interfaces.map((items, index) => (
                    <li key={index} className="pb-[40px] flex items-center text-[18px] lg:text-[22px] text-[#696984] leading-[180%] font-normal tracking-[2%]">
                      <div className="w-[60px] h-[60px] bg-[#FBFBFB] rounded-[50%] flex items-center justify-center mr-[42px] shadow-[0px_15px_44px_rgba(13,15,28,0.12)]">
                        <img src={items.image} alt={items.text} className=" w-fit h-[26px] object-contain" />
                      </div>
                      {items.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:h-[611px] absolute -z-1 lg:top-[900px] 3xl:top-[810px] lg:left-[69px] lg:right-[71.8px] flex gap-[100px] lg:gap-[21px] 3xl:gap-[236px] items-center">
            <div className="flex-1"> 
              <h5 className="text-[24px] lg:text-[40px] font-semibold leading-[160%] text-[#2F327D]"><span className="text-[#00CBB8]">Tools </span>For Teachers And Learners</h5>
              <p className="text-[18px] lg:text-[22px] text-[#696984] font-normal leading-[180%] tracking-[2%]">Class has a dynamic set of teaching tools built to be deployed and used during class.
                Teachers can handout assignments in real-time for students to complete and submit.
              </p>
            </div>
            <div className=" flex-1 h-[400px] 3xl:w-[627.2px] 3xl:h-[611px]">
              <img src="/images/featgirl.png" alt="Feature girl" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
        <div className=" lg:pt-[160px] lg:pb-[57px]">
          <div className="">
            <div className="flex items-center gap-[100px] lg:gap-[248px]">
              <div className="w-full h-full">
                <img src="/images/feat3.png" alt="Feature 3" className="w-full h-full object-contain" />
              </div>
              <div className="w-full">
                <h5 className="w-[58.22%] text-[24px] lg:text-[32px] pb-[20px] font-semibold leading-[160%] text-[#2F327D]">Assessments, <span className="text-[#00CBB8]">Quizzes</span>, Tests</h5>
                <p className="text-[18px] lg:text-[22px] text-[#696984] font-normal leading-[180%] tracking-[2%]">
                  Easily launch live assignments, quizzes, and tests.
                  Student results are automatically entered in the online gradebook.
                </p>
              </div>
            </div>
            <div className="pt-[90px] items-stretch lg:pt-[175.75px] flex flex-col md:flex-row items-center gap-[90px] lg:gap-[133.94px]">
              <div className="w-full">
                <h5 className=" lg:w-[58.22%] text-[24px] lg:text-[32px] pb-[20px] font-semibold leading-[160%] text-[#2F327D]"><span className="text-[#00CBB8]">Class Management</span> Tools for Educators</h5>
                <p className="text-[18px] lg:text-[22px] text-[#696984] font-normal leading-[180%] tracking-[2%]">
                  Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.
                </p>
              </div>
              <div className="w-full h-full">
                <img src="/images/feat4.png" alt="Feature 4" className="w- h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center gap-[100px] lg:gap-[248px] pt-[145px] pb-[57px] lg:pb-[150px]">
              <div className="w-full h-full">
                <img src="/images/feat5.png" alt="Feature 5" className="w-full h-full object-contain" />
              </div>
              <div className="w-full">
                <h5 className="lg:w-[58.22%] text-[24px] lg:text-[32px] pb-[20px] font-semibold leading-[160%] text-[#2F327D]">One-on-One  <span className="text-[#00CBB8]">Discussions</span></h5>
                <p className="text-[18px] lg:text-[22px] text-[#696984] font-normal leading-[180%] tracking-[2%]">
                  Easily launch live assignments, quizzes, and tests.
                  Student results are automatically entered in the online gradebook.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-[#49BBBD] bg-white rounded-[80px] w-[280px] h-[80px] flex items-center justify-center mx-auto">
            <Link href="/" className="text-[#00CBB8] font-semibold text-[22px]">See More Features</Link>
          </div>
        </div>
      </section>

      {/* Explore Course */}
      <section>
        <div className="h-[2000px] lg:h-[2408.89px] relative roboto">
          <div className="absolute left-0 top-0 w-3/4 bg-[#9DCCFF]/20 h-[2000px] lg:h-[2408.89px] rounded-br-[80px]"></div>
          <div className="absolute top-0 left-0 w-full h-[2408.89px] pl-[40px] lg:pl-[155.88px] pt-[160px]">
            <h5 className="text-[40px] pb-[24.27px] font-bold leading-auto text-black/[87%] roboto">Explore Course</h5>
            <p className="roboto text-[24px] font-medium leading-auto">Ut sed eros finibus, placerat orci id, dapibus.</p>
            {/* first block */}
            <div className="pr-[73.04px]">
              <div className="relative pt-[121.25px] ">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center ">
                    <div className="mr-[16.78px] w-[29.15px] h-[29.29px]">
                      <img src="/images/palette.png" alt="" className="" />
                    </div>
                    <p className="text-[28px] text-black/[87%] font-bold">Lorem Ipsum</p>
                  </div>
                  <div className="flex items-center gap-[49.18px]  ">
                    <Link href="/" className="text-[#00BCD4] font-medium text-[24px]">SEE ALL</Link>
                    <span className="w-[32.01px] h-[32.08px]"><img src="/images/arrow.png" alt="" /></span>
                  </div>
                </div>
                <div className="pt-[41.52px] flex items-center gap-[7.69px]">
                  <div className="flex items-center gap-[7.69px] overflow-x-auto">
                    <div className="">   
                      <img src="/images/book.png" alt="Course Image" className="" />
                    </div> 
                    <div className="">                
                      <img src="/images/book1.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                 
                      <img src="/images/book2.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                 
                      <img src="/images/book3.png" alt="Course Image" className="" />
                    </div>
                    <div className="">
                      <img src="/images/book4.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                
                      <img src="/images/book5.png" alt="Course Image" className="" />
                    </div>
                    <div className="">
                      <img src="/images/book6.png" alt="Course Image" className="" />
                    </div>
                  </div>
                  <div className="">
                    <img src="/images/detail.png" alt="" />
                  </div>
                </div>
                <div className="absolute -z-1 w-full  mr-[73.04px] bottom-[-23.39px] h-[82.3px] bg-black opacity-5 rounded-[29.5px]"></div>
              </div>
            </div>
            {/* second block */}
            <div className="pr-[73.04px] py-[111.59px]">
              <div className="relative pt-[121.25px] ">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center ">
                    <div className="mr-[16.78px] w-[29.15px] h-[29.29px]">
                      <img src="/images/globe.png" alt="" className="" />
                    </div>
                    <p className="text-[28px] text-black/[87%] font-bold">Quisque a Consequat</p>
                  </div>
                  <div className="flex items-center gap-[49.18px]  ">
                    <Link href="/" className="text-[#00BCD4] font-medium text-[24px]">SEE ALL</Link>
                    <span className="w-[32.01px] h-[32.08px]"><img src="/images/arrow.png" alt="" /></span>
                  </div>
                </div>
                <div className="pt-[41.52px] flex items-center gap-[7.69px]">
                  <div className="flex items-center gap-[7.69px] overflow-x-auto">
                    <div className="">   
                      <img src="/images/book.png" alt="Course Image" className="" />
                    </div> 
                    <div className="">                
                      <img src="/images/book1.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                 
                      <img src="/images/book2.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                 
                      <img src="/images/detail1.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                 
                      <img src="/images/book3.png" alt="Course Image" className="" />
                    </div>
                    <div className="">
                      <img src="/images/book4.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                
                      <img src="/images/book5.png" alt="Course Image" className="" />
                    </div>
                    <div className="">
                      <img src="/images/book6.png" alt="Course Image" className="" />
                    </div>
                  </div>
                </div>
                <div className="absolute -z-1 w-full  mr-[73.04px] bottom-[-23.39px] h-[82.3px] bg-black opacity-5 rounded-[29.5px]"></div>
              </div>
            </div>
            {/* third block */}
            <div className="pr-[73.04px] py-[111.59px]">
              <div className="relative pt-[121.25px] ">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center ">
                    <div className="mr-[16.78px] w-[29.15px] h-[29.29px]">
                      <img src="/images/ribbon-b.png" alt="" className="" />
                    </div>
                    <p className="text-[28px] text-black/[87%] font-bold">Aenean Facilisis</p>
                  </div>
                  <div className="flex items-center gap-[49.18px]  ">
                    <Link href="/" className="text-[#00BCD4] font-medium text-[24px]">SEE ALL</Link>
                    <span className="w-[32.01px] h-[32.08px]"><img src="/images/arrow.png" alt="" /></span>
                  </div>
                </div>
                <div className="pt-[41.52px] flex items-center gap-[7.69px]">
                  <div className="flex items-center gap-[7.69px] overflow-x-auto">
                    <div className="">   
                      <img src="/images/book.png" alt="Course Image" className="" />
                    </div> 
                    <div className="">                 
                      <img src="/images/detail2.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                
                      <img src="/images/book1.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                 
                      <img src="/images/book2.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                 
                      <img src="/images/book3.png" alt="Course Image" className="" />
                    </div>
                    <div className="">
                      <img src="/images/book4.png" alt="Course Image" className="" />
                    </div>
                    <div className="">                
                      <img src="/images/book5.png" alt="Course Image" className="" />
                    </div>
                    <div className="">
                      <img src="/images/book6.png" alt="Course Image" className="" />
                    </div>
                  </div>
                </div>
                <div className="absolute -z-1 w-full  mr-[73.04px] bottom-[-23.39px] h-[82.3px] bg-black opacity-5 rounded-[29.5px]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonials */}
      <section>
        <div className="pl-[40px] pr-[40px] xl:pl-[200px] xl:pr-[201px] pt-[129.11px] pb-[150px] flex flex-col lg:flex-row justify-between items-center gap-[158px] ">
          <div className="hidden lg:block flex-1">
            <div className="pb-8 flex items-center gap-[30px]">
              <div className="w-[80px] bg-[#525596] border-dotted border rounded-full"></div>
              <p className="text-[#525596] nunito text-[20px] font-normal tracking-[4px]">TESTIMONIAL</p>
            </div>
            <div className="">
              <h5 className="text-[60px] nunito font-bold leading-auto text-[#2F327D]">What They Say? </h5>
              <p className="text-[26px] font-normal leading-[160%] text-[#696984] tracking-[2%] pt-[29px]">
                TOTC has got more than 100k positive ratings from our users around the world.
              </p>
              <p className="text-[26px] font-normal leading-[160%] text-[#696984] tracking-[2%] pt-[26px]">
                Some of the students and teachers were greatly helped by the Skilline.            
              </p>
              <p className="text-[26px] font-normal leading-[160%] text-[#696984] tracking-[2%] pt-[46px] pb-[43px]">
                Are you too? Please give your assessment
              </p>
              <button className="flex items-center border border-[#49BBBD] text-[#49BBBD]  rounded-[80px] text-[22px] leading-[160%] bg-white tracking-[2%] font-normal">
                <p className="pt-[23px] pb-[22px] pl-[38px]">Write your Assessment</p>
                <div className="ml-[26px] w-[80px] h-[80px] rounded-full border border-[#49BBBD] flex items-center justify-center">
                  <img src="/images/arrow2.png" alt="" className="" />
                </div>
              </button>
            </div>
          </div>
          {/* <div className="relative">
            <div className="absolute ">
              <img src="/images/testimonial.png" alt="Testimonial Image" className="w-full h-full object-cover object-center" />
            </div> 
            <div className="">
                <div className="">
                  <p></p>
                </div>
                <div className="">
                  <p></p>
                </div>
            </div> 
          </div> */}
          <div className="flex-1 w-full">
            <Testimonial />
          </div>
        </div>
      </section>
      {/* Last Articles*/}
      <section className="pl-[40px] xl:pl-[200px] pr-[40] xl:pr-[163px]">
        <div className="flex flex-col items-center">
          <h5 className="text-[36px] pb-5 nunito font-bold leading-[180%] text-[#2F327D]">Lastest News and Resources</h5>
          <p className="pb-[100px] text-center text-[24px] font-normal leading-[160%] text-[#696984] tracking-[2%] pt-[29px]">
            See the developments that have occurred to TOTC in the world
          </p>
          <div className="pb-[105px] w-full">
            <NewsSection />
          </div>
        </div>
      </section>
      {/* Footer */}
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
