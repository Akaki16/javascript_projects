'use strict';

const commands = [
    {
        title: 'git status',
        description: 'show modified files in working directory, staged for your next commit',
        link: "https://git-scm.com/docs/git-status",
    },
    {
        title: 'git add',
        description: 'add a file as it looks now to your next commit (stage)',
        link: "https://git-scm.com/docs/git-add",
    },
    {
        title: 'git reset',
        description: 'unstage a file while retaining the changes in working directory',
        link: "https://git-scm.com/docs/git-reset",
    },
    {
        title: 'git diff',
        description: 'diff of what is changed but not staged',
        link: "https://git-scm.com/docs/git-diff",
    },
    {
        title: 'git diff --staged',
        description: 'diff of what is staged but not yet commited',
        link: "https://git-scm.com/docs/git-diff",
    },
    {
        title: 'git commit',
        description: 'commit your staged content as a new commit snapshot',
        link: "https://git-scm.com/docs/git-commit",
    },
    {
        title: 'git config --global user.name',
        description: 'set a name that is identifiable for credit when review version history',
        link: "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup",
    },
    {
        title: 'git config --global user.email',
        description: 'set an email address that will be associated with each history marker',
        link: "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup",
    },
    {
        title: 'git config --global color.ui auto',
        description: 'set automatic command line coloring for Git for easy reviewing',
        link: "https://git-scm.com/book/sv/v2/Customizing-Git-Git-Configuration",
    },
    {
        title: 'git init',
        description: 'initialize an existing directory as a Git repository',
        link: "https://git-scm.com/docs/git-init",
    },
    {
        title: "git clone",
        description: "retrieve an entire repository from a hosted location via URL",
        link: "https://git-scm.com/docs/git-clone",
    },
    {
        title: "git branch",
        description: "list your branches. a * will appear next to the currently active branch",
        link: "https://git-scm.com/docs/git-branch",
    },
    {
        title: "git checkout",
        description: "switch to another branch and check it out into your working directory",
        link: "https://www.git-scm.com/docs/git-checkout",
    },
    {
        title: "git merge",
        description: "merge the specified branch’s history into the current one",
        link: "https://git-scm.com/docs/git-merge",
    },
    {
        title: "git log",
        description: "show all commits in the current branch’s history",
        link: "https://git-scm.com/docs/git-log",
    },
    {
        title: "git log --follow",
        description: "show the commits that changed file, even across renames",
        link: "https://git-scm.com/docs/git-log",
    },
    {
        title: "git remote add",
        description: "add a git URL as an alias",
        link: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes",
    },
    {
        title: "git fetch",
        description: "fetch down all the branches from that Git remote",
        link: "https://git-scm.com/docs/git-fetch",
    },
    {
        title: "git merge",
        description: "merge a remote branch into your current branch to bring it up to date",
        link: "https://git-scm.com/docs/git-merge",
    },
    {
        title: "git push",
        description: "Transmit local branch commits to the remote repository branch",
        link: "https://git-scm.com/docs/git-push",
    },
    {
        title: "git pull",
        description: "fetch and merge any commits from the tracking remote branch",
        link: "https://git-scm.com/docs/git-pull",
    },
];

const searchForm = document.getElementById('search-form');

const searchCommandText = document.getElementById('search-command-text');
const modalBtn = document.querySelector('.modal-btn');

const commandTitle = document.querySelector('.command-title');
const commandDesc = document.querySelector('.command-desc');
const commandDescription = document.querySelector('.command-description');
const commandLink = document.querySelector('.command-link');

const modalBody = document.querySelector('.modal-body');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');

// not show it default
showCommandDescription('none');

function showCommandDescription(style)
{
    commandDesc.style.display = style;
}

function resetForm()
{
    searchCommandText.value = '';
}

function searchCommand()
{
    let searchedCommand;

    /* run linear search */
    for (let i = 0; i < commands.length; i++)
    {
        if (searchCommandText.value.toLowerCase() === commands[i].title)
        {
            searchedCommand = commands[i];
        }
    }

    if (searchedCommand)
    {
        return searchedCommand;
    }
    else if (searchCommandText.value === '')
    {
        Swal.fire("Please enter the git command");
    }
    else
    {
        Swal.fire("Please enter valid git command");
    }
}

function showCommandExplanation(command)
{
    if (command)
    {
        showCommandDescription('block');
        commandTitle.textContent = `cmd title: ${command.title}`;
        commandDescription.textContent = `cmd description: ${command.description}`;
        commandLink.href = `${command.link}`;
        commandLink.textContent = `Read more about this command here: ${command.title}`;
    }
    else if (!command)
    {
        showCommandDescription('none');
    }
}

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const command = searchCommand();

    showCommandExplanation(command);

    resetForm();
});

modalBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);

function showGitCommands()
{
    for (let i = 0; i < commands.length; i++)
    {
        const gitCommand = document.createElement('a');
        gitCommand.href = commands[i].link;
        gitCommand.target = '_blank';
        gitCommand.textContent = commands[i].title;
        modalBody.appendChild(gitCommand);
    }
}

function showModal()
{
    modal.style.display = 'block';
    
    showGitCommands();
}

function closeModal()
{
    modal.style.display = 'none';
}

// Close modal by pressing on the Esc keyword
window.addEventListener('keydown', e => {
    if (e.code === 'Escape')
    {
        closeModal();
    }
});