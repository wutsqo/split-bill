import { ArrowRightIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MockupBills from "@images/mockups/bills.png";
import MockupPeople from "@images/mockups/people.png";
import MockupSummary from "@images/mockups/summary.png";
import Image from "next/image";
import { appName } from "./config";
import Balancer from "react-wrap-balancer";
import TrakteerButton from "./trakteer/button";

export default function Home() {
  return (
    <main className="">
      <div className="fill-accent absolute top-0 w-full">
        <div className="w-full h-32 lg:h-0 bg-[#3405BB] "></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className="fill-[#3405BB]"
            fillOpacity="1"
            d="M0,320L60,293.3C120,267,240,213,360,176C480,139,600,117,720,144C840,171,960,245,1080,272C1200,299,1320,277,1380,266.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="navbar z-50 relative lg:absolute text-white">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">{appName}</a>
        </div>
        <div className="flex-none">
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost btn-sm shadow-none drawer-button h-10 w-10"
          >
            <Bars3Icon className="w-6 h-6" />
          </label>
        </div>
      </div>

      <div className="hero min-h-screen container max-w-screen-xl mx-auto">
        <div className="hero-content h-full flex-col lg:flex-row-reverse w-full justify-start md:justify-center">
          <div className="max-w-sm w-full h-[35vh] sm:h-full relative">
            <div className="scale-1/4 sm:scale-1/3 xl:scale-50 h-full">
              <div className="mockup-phone absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2 -rotate-12">
                <div className="camera"></div>
                <div className="display bg-base-100">
                  <div className="artboard artboard-demo phone-4 mt-8 relative">
                    <Image src={MockupPeople} alt="Mockup of the app" fill />
                  </div>
                </div>
              </div>
              <div className="mockup-phone absolute left-1/2 top-1/2 -translate-y-1/2 rotate-12">
                <div className="camera"></div>
                <div className="display bg-base-100">
                  <div className="artboard artboard-demo phone-4 mt-8 relative">
                    <Image src={MockupSummary} alt="Mockup of the app" fill />
                  </div>
                </div>
              </div>
              <div className="mockup-phone absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="camera"></div>
                <div className="display bg-base-100">
                  <div className="artboard artboard-demo phone-4 mt-8 relative">
                    <Image src={MockupBills} alt="Mockup of the app" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-screen-md">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <Balancer>The Easiest Expense Sharing App.</Balancer>
            </h1>
            <p className="text-lg sm:text-xl py-6 mb-6">
              Track your shared expenses and simplify debt calculations with
              friends and roommates hassle-free with <strong>{appName}</strong>.
            </p>
            <Link href="/app">
              <button className="btn sm:btn-lg uppercase group glass btn-primary bg-primary">
                Try Now
                <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-all" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 pb-16">
        <h2 className="text-center text-4xl">Split Expenses Easily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-16 mb-24">
          <div className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">😊 Easy to Use</h2>
              <p className="mt-4">
                Add and manage your expenses with a few clicks with our
                intuitive interface.
              </p>
            </div>
          </div>
          {/* <div className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">👤 No Registration Needed</h2>
              <p className="mt-4">
                Use the app without registration. Your data is stored in your
                browser.
              </p>
            </div>
          </div>
          <div className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">🆓 Free to Use</h2>
              <p className="mt-4">
                {appName} is completely free to use and no payment is required.
              </p>
            </div>
          </div> */}
          <div className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">🔀 Multiple Splitting Options</h2>
              <p className="mt-4">
                Split expenses equally, unequally, or by percentage.
              </p>
            </div>
          </div>
          <div className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">📑 Export to Spreadsheet</h2>
              <p className="mt-4">
                Export your expenses to a spreadsheet easily.
              </p>
            </div>
          </div>
          <div className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">✨ Simplify Debt Calculations</h2>
              <p className="mt-4">
                We will calculate and show you the easiest way to settle up.
              </p>
            </div>
          </div>
          <div className="card w-full bg-primary col-span-1 md:col-span-2 text-base-100">
            <div className="card-body py-12 flex md:flex-row justify-between gap-8">
              <div>
                <h2 className="text-3xl">Start sharing your expenses</h2>
                <p className="mt-1">
                  And spend more time enjoying your occasion.
                </p>
              </div>
              <div>
                <Link href="/app">
                  <button className="btn md:btn-lg uppercase group glass bg-primary-content">
                    Open App
                    <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-all" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg
        viewBox="0 0 900 160"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <path
          d="M0 68L21.5 62.2C43 56.3 86 44.7 128.8 38.2C171.7 31.7 214.3 30.3 257.2 39.2C300 48 343 67 385.8 65C428.7 63 471.3 40 514.2 32.3C557 24.7 600 32.3 642.8 35.5C685.7 38.7 728.3 37.3 771.2 42.7C814 48 857 60 878.5 66L900 72L900 161L878.5 161C857 161 814 161 771.2 161C728.3 161 685.7 161 642.8 161C600 161 557 161 514.2 161C471.3 161 428.7 161 385.8 161C343 161 300 161 257.2 161C214.3 161 171.7 161 128.8 161C86 161 43 161 21.5 161L0 161Z"
          fill="#9165ff"
        ></path>
        <path
          d="M0 55L21.5 62.7C43 70.3 86 85.7 128.8 88C171.7 90.3 214.3 79.7 257.2 74C300 68.3 343 67.7 385.8 66.7C428.7 65.7 471.3 64.3 514.2 71.7C557 79 600 95 642.8 104.8C685.7 114.7 728.3 118.3 771.2 118.8C814 119.3 857 116.7 878.5 115.3L900 114L900 161L878.5 161C857 161 814 161 771.2 161C728.3 161 685.7 161 642.8 161C600 161 557 161 514.2 161C471.3 161 428.7 161 385.8 161C343 161 300 161 257.2 161C214.3 161 171.7 161 128.8 161C86 161 43 161 21.5 161L0 161Z"
          fill="#4a00ff"
        ></path>
        <path
          d="M0 141L21.5 140.7C43 140.3 86 139.7 128.8 133.7C171.7 127.7 214.3 116.3 257.2 109C300 101.7 343 98.3 385.8 103.5C428.7 108.7 471.3 122.3 514.2 122C557 121.7 600 107.3 642.8 108C685.7 108.7 728.3 124.3 771.2 127.7C814 131 857 122 878.5 117.5L900 113L900 161L878.5 161C857 161 814 161 771.2 161C728.3 161 685.7 161 642.8 161C600 161 557 161 514.2 161C471.3 161 428.7 161 385.8 161C343 161 300 161 257.2 161C214.3 161 171.7 161 128.8 161C86 161 43 161 21.5 161L0 161Z"
          fill="#3405bb"
        ></path>
      </svg>

      <div className="bg-[#3405BB] text-primary-content">
        <footer className="items-center px-4 py-12 mx-auto container max-w-screen-xl flex flex-col md:flex-row justify-between gap-8">
          <p>
            <span>Built with 🤍 by </span>

            <a
              className="link"
              href="https://wutzz.space"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wutsqo
            </a>
          </p>
          <TrakteerButton className="btn" />
        </footer>
      </div>
    </main>
  );
}
