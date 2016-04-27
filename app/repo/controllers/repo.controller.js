class RepoController {
    constructor(Repository) {
        this.repository = Repository;
    }
};

RepoController.$inject = ['Repository']

export default RepoController;
