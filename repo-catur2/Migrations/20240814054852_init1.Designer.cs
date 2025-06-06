﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApps.Controllers;

#nullable disable

namespace WebApps.Migrations
{
    [DbContext(typeof(MasterDbContext))]
    [Migration("20240814054852_init1")]
    partial class init1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebApps.Models.ServiceModel.BenchmarkingModel", b =>
                {
                    b.Property<int>("BenchmarkingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BenchmarkingId"));

                    b.Property<string>("JenisKegiatanUsaha")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("KlasifikasiUsaha")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("NamaPerusahaan")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Negara")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Rasio")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("BenchmarkingId");

                    b.ToTable("Benchmarking");
                });

            modelBuilder.Entity("WebApps.Models.ServiceModel.BenchmarkingTahunModel", b =>
                {
                    b.Property<int>("BenchmarkingTahunId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BenchmarkingTahunId"));

                    b.Property<int>("BenchmarkingId")
                        .HasColumnType("int");

                    b.Property<double>("Rasio")
                        .HasColumnType("float");

                    b.Property<int>("Tahun")
                        .HasColumnType("int");

                    b.HasKey("BenchmarkingTahunId");

                    b.ToTable("BenchmarkingTahun");
                });
#pragma warning restore 612, 618
        }
    }
}
