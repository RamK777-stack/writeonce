import React, { Component } from 'react';
import { AppWrapper } from '../../common/AppWrapper';
import { HomeIcon, ClipboardListIcon, AnnotationIcon, LockClosedIcon, PhotographIcon, SearchIcon, XCircleIcon, XIcon } from '@heroicons/react/outline'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }


    handleChange = (value) => {
        this.setState({ text: value })
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
    }

    render() {
        return (
            <div className="container mx-auto px-4 mt-10">
                <div className="flex mt-5 lg:flex-row flex-col">
                    <div className="flex-none lg:w-1/7">
                        <ul className="text-left list-inside mr-10">
                            <li class="flex px-6 py-2 mb-1 cursor-pointer menu-not-active hover:bg-gray-100">
                                <HomeIcon className="h-6 w-6 text-gray-600" aria-hidden="true" /> <span className="pl-3"> Home </span>
                            </li>
                            <li class="flex px-6 py-2 mb-1 cursor-pointer menu-not-active hover:bg-gray-100 ">
                                <ClipboardListIcon className="h-6 w-6 text-gray-600" aria-hidden="true" /> <span className="pl-3"> Posts </span>
                            </li>
                            <li class="flex px-6 py-2 mb-1 cursor-pointer menu-not-active hover:bg-gray-100 ">
                                <AnnotationIcon className="h-6 w-6 text-gray-600" aria-hidden="true" /> <span className="pl-3"> Tags </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-grow">
                        <div className="container bg-gray-100">
                            <div class="relative">
                                <div className="absolute inset-0 m-auto mr-4 w-5 h-5 text-[#71717A]  flex items-center 
                             cursor-pointer">
                                    <PhotographIcon className="h-6 w-6 z-40 text-gray-500" aria-hidden="true" />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="post-title"
                                        name="title"
                                        type="title"
                                        autoComplete="title"
                                        required
                                        className="bg-gray-100 text-3xl appearance-none rounded-t 
                                        relative block w-full 
                                px-4 py-3 border-b-1 mb-5 border-b-gray-100 
                                placeholder-gray-500 text-gray-900
                                focus:outline-none focus:ring-indigo-500 focus:border-b-indigo-500 focus:z-10"
                                        placeholder="Post title here ..."
                                    />
                                </div>

                            </div>
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                        </div>
                    </div>
                    <div className="flex-none pl-5 ml-5">
                        <fieldset>
                            <legend className="text-base font-medium text-gray-900">Sites</legend>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="comments" className="font-medium text-gray-700">
                                            Medium
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="candidates" className="font-medium text-gray-700">
                                            dev.to
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="offers" className="font-medium text-gray-700">
                                            hashnode
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="ownblog"
                                            name="ownblog"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="ownblog" className="font-medium text-gray-700">
                                            My Blog
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="mt-5">
                            <legend className="text-base font-medium text-gray-900">Hash tags</legend>
                            <div className="mt-4 space-y-4">
                                <div class="pt-2 relative mx-auto text-gray-600">
                                    <div className="absolut">
                                        <input class="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                                            type="search" name="search" placeholder="Search" />
                                        {/* <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                                            <SearchIcon className="h-4 w-4 z-40 text-gray-500" />
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                            <div class="my-3 grid grid-cols-3 gap-1">
                                <button class="inline-flex items-center px-2 text-xs border-2 border-blue-300 hover:bg-blue-300 hover:text-white h-8 w-16 text-gray-600 font-bold rounded-full">
                                    <span>Tag1</span>
                                    <XIcon className="h-4 w-4 z-40 text-red-400 ml-1" aria-hidden="true" />
                                </button>
                                <button class="inline-flex items-center px-2 text-xs border-2 border-blue-300 hover:bg-blue-300 hover:text-white h-8 w-16 text-gray-600 font-bold rounded-full">
                                    <span>Tag2</span>
                                    <XIcon className="h-4 w-4 z-40 text-red-400 ml-1" aria-hidden="true" />
                                </button>
                                <button class="inline-flex items-center px-2 text-xs border-2 border-blue-300 hover:bg-blue-300 hover:text-white h-8 w-16 text-gray-600 font-bold rounded-full">
                                    <span>Tag3</span>
                                    <XIcon className="h-4 w-4 z-40 text-red-400 ml-1" aria-hidden="true" />
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppWrapper(Post)