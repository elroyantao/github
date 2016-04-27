class ListController {
    constructor(Repositories) {
        console.log(Repositories);
        this.repos = Repositories;
    }
};

ListController.$inject = ['Repositories']

export default ListController;
