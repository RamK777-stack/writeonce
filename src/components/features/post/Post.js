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
            <div>
                content
            </div>
        )
    }
}

export default AppWrapper(Post)