import Topbar from "@/components/topbar/Topbar";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Link from "next/link";
import { Button } from "@mui/material";

export default async function Index() {

  return (
    <div className="w-full flex flex-col gap-20">
      <Topbar></Topbar>

      <div>
        <h4 className="text-4xl font-extrabold leading-none tracking-tight text-center text-gray-900 dark:text-white">Empowering Care</h4>
        <p className="text-center mt-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">Seamless Reminders for Patient Well-being</p>
      </div>

        
  <div className="flex justify-center items-center mt-10">
    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
      <div className="relative">
        <dt>
          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <LocalPhoneIcon />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Automation Made Easy</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Rydan reminds your patients automatically at an assigned time
            </dd>
        </div>

        <div className="relative">
            <dt>
                <div
                    className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <LiveHelpIcon />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Welfare Checks</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              A phone call each day to check that your patients are OK
            </dd>
        </div>
    </dl>
    </div>
    <div className="mt-10 mb-10 sm:mt-8 sm:flex justify-center">
      <div className="rounded-md shadow">
        <Link className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              href="/login">Get started for free</Link>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
        <a href="https://calendly.com/rydanlabs/30min"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
            Book a demo
        </a>
    </div>
    </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-xs">
        <p>
         © 2024 Rydan
        </p>
      </footer>
    </div>
  );
}
