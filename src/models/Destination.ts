
export default class Destination{
    public DestinationID : string;
    public DestinationTitle:  string;
    public Abbreviation : string;

    constructor(Destination ?: string,DestinationTitle ?: string,Abbreviation ?: string){
        this.DestinationID = Destination;
        this.DestinationTitle = DestinationTitle;
        this.Abbreviation  = Abbreviation;
    }
}