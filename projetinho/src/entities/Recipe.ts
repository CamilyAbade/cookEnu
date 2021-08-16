export class Recipe{
    constructor(
        private id_recipe: string,
        private title: string,
        private description: string,
        private id_user: string

    ){}

    public getIdRecipe(){
        return this.id_recipe
    }

    public getTitle(){
        return this.title
    }

    public getDescription(){
        return this.description
    }

    public getIdUser(){
        return this.id_user
    }

    static toUserModel(data: any): Recipe{
        return new Recipe(data.id_recipe, data.title, data.description, data.id_user)
    }

}