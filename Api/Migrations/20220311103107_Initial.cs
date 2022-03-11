using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bids",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HouseId = table.Column<int>(type: "INTEGER", nullable: false),
                    Bidder = table.Column<string>(type: "TEXT", nullable: false),
                    Amount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bids", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Houses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Country = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Houses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 1, 200000, "Sonia Reading", 1 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 2, 202400, "Dick Johnson", 1 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 3, 302400, "Mohammed Vahls", 2 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 4, 310500, "Jane Williams", 2 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 5, 315400, "John Kepler", 2 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 6, 201000, "Bill Mentor", 3 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 7, 410000, "Melissa Kirk", 4 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 8, 450000, "Scott Max", 4 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 9, 470000, "Christine James", 4 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 10, 450000, "Omesh Carim", 5 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 11, 150000, "Charlotte Max", 5 });

            migrationBuilder.InsertData(
                table: "Bids",
                columns: new[] { "Id", "Amount", "Bidder", "HouseId" },
                values: new object[] { 12, 170000, "Marcus Scott", 5 });

            migrationBuilder.InsertData(
                table: "Houses",
                columns: new[] { "Id", "Address", "Country", "Description", "Price" },
                values: new object[] { 1, "12 Valley of Kings, Geneva", "Switzerland", "A superb detached Victorian property on one of the town's finest roads, within easy reach of Barnes Village. The property has in excess of 6000 sq/ft of accommodation, a driveway and landscaped garden.", 900000 });

            migrationBuilder.InsertData(
                table: "Houses",
                columns: new[] { "Id", "Address", "Country", "Description", "Price" },
                values: new object[] { 2, "89 Road of Forks, Bern", "Switzerland", "This impressive family home, which dates back to approximately 1840, offers original period features throughout and is set back from the road with off street parking for up to six cars and an original Coach House, which has been incorporated into the main house to provide further accommodation. ", 500000 });

            migrationBuilder.InsertData(
                table: "Houses",
                columns: new[] { "Id", "Address", "Country", "Description", "Price" },
                values: new object[] { 3, "Grote Hof 12, Amsterdam", "The Netherlands", "This house has been designed and built to an impeccable standard offering luxurious and elegant living. The accommodation is arranged over four floors comprising a large entrance hall, living room with tall sash windows, dining room, study and WC on the ground floor.", 200500 });

            migrationBuilder.InsertData(
                table: "Houses",
                columns: new[] { "Id", "Address", "Country", "Description", "Price" },
                values: new object[] { 4, "Meel Kade 321, The Hague", "The Netherlands", "Discreetly situated a unique two storey period home enviably located on the corner of Krom Road and Recht Road offering seclusion and privacy. The house features a magnificent double height reception room with doors leading directly out onto a charming courtyard garden.", 259500 });

            migrationBuilder.InsertData(
                table: "Houses",
                columns: new[] { "Id", "Address", "Country", "Description", "Price" },
                values: new object[] { 5, "Oude Gracht 32, Utrecht", "The Netherlands", "This luxurious three bedroom flat is contemporary in style and benefits from the use of a gymnasium and a reserved underground parking space.", 400500 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bids");

            migrationBuilder.DropTable(
                name: "Houses");
        }
    }
}
