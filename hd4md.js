/**
 * HeredocForMarkdown 1.0.0
 *
 * Copyright (c) 2022 ASAI Etsuhisa
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 */
function HeredocForMarkdown(parser, targetid, display){
	return {
		mdscript: null,
		cwd: [],
		parser: parser,
		targetid: targetid,
		display: display || function(targetid, html){
			const content = document.getElementById(targetid);
			content.innerHTML = html;
			content.querySelectorAll('a').forEach(a =>
				a.addEventListener('click', this.link.bind(this))
			);
		},
		get: function(fn){
			return fn.toString()
				.split(/\r\n|\n|\r/).slice(1,-1).join("\n")
				.replace(/\*\\\//g, '*/');
		},
		set: function(fn){
			const html = this.parser(this.get(fn));
			this.display(this.targetid, html);
		},
		link: function(e){
			const href = e.target.getAttribute("href");
			if(href.indexOf("://") != -1){
				return true;
			}
			this.load(href);
			e.preventDefault();
			return false;
		},
		getpath: function(file){
			file.split("/").forEach(ent => {
				switch(ent){
				case "." :
					break;
				case ".." :
					this.cwd.pop();
					break;
				default :
					this.cwd.push(ent);
					break;
				}}
			);
			const path = this.cwd.join("/");
			this.cwd.pop();
			return /\.md$/.test(path) ? path : path+".md";
		},
		load: function(file){
			if(this.mdscript != null){
				document.head.removeChild(this.mdscript);
			}
			this.mdscript = document.createElement('script');
			this.mdscript.src = this.getpath(file);
			document.head.appendChild(this.mdscript);
		}
	};
};
