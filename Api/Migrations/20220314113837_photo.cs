using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class photo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Houses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bids_HouseId",
                table: "Bids",
                column: "HouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_Houses_HouseId",
                table: "Bids",
                column: "HouseId",
                principalTable: "Houses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_Houses_HouseId",
                table: "Bids");

            migrationBuilder.DropIndex(
                name: "IX_Bids_HouseId",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Houses");
        }
    }
}
